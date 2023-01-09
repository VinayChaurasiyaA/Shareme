export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    // fields must be defined, and it must be an array
    {
      name: 'username',
      type: 'string',
      title: 'UserName',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
  ],
}
// {
//     name : 'username' ,
//     type : 'string',
//     title : 'UserName' ,
// } ,
// {
//     name : 'image' ,
//     title : 'Image' ,
//     type : 'string'
// }
