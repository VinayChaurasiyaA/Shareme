import user from './User'
import pin from './pin'
import comment from './comment'
import save from './save'
import postedBy from './postedBy'
export const schemaTypes = [user , pin , comment , save , postedBy]
// ] = ({ 
//     types: schemaTypes.concat(
//         [user]
//     ),
// })

// export const createSchemas = {

//     name : 'default' ,
//     types : schemaTypes.concat(
//         [
//             user
//         ]
//     ),
// }