import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import logo from "../assets/logo.jpg";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();
  // use effech should always callled before all of the if statements

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4,
            postedBy: {
              _type: "postedBy",
              _ref: user?._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    // if there will be more images of that pinDetails or category then we can show them
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };
  if (!pinDetail) {
    return <Spinner message={"Loading pin"} />;
  }
  return (
    <>
      <div
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRdius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt="userPost"
            className="rounded-t-3xl rounded-b-lg"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => {
                  e.stopPropagation();
                }} // it stops the DOM parent class
                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opactiy-75 hover:opactiy-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              src={
                pinDetail.postedBy?.image == null
                  ? logo
                  : pinDetail.postedBy?.image
              }
              alt="postedBy"
              className="w-8 h-8 rounded-full object-cover "
            />
            <p className="font-semibold text-dark capitalize ">
              {/* {console.log(postedBy.userName)} */}
              {/* i should check out using pinDetail.postedBy?.username */}
              {pinDetail.postedBy?.userName == null
                ? "shareme"
                : pinDetail.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetail?.comments?.map((comment, i) => (
              <div
                key={i}
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
              >
                <img
                  src={comment.postedBy.image}
                  alt="userProfile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
              <img
                src={
                  pinDetail.postedBy?.image == null
                    ? logo
                    : pinDetail.postedBy?.image
                }
                alt="postedBy"
                className="w-10 h-10 rounded-full cursor-pointer "
              />
            </Link>
            <input
              type="text"
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              placeholder="Add comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? "Posting comment" : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0  ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins}/>
        </>
      ) : (
        <Spinner message="loading more pins.." />
      )}
    </>
  );
};

export default PinDetail;
