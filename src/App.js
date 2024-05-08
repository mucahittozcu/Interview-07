import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [userInput,setUserInput] = useState("")
  const [userInputList1,setUserInputList1] = useState([])
  const [userInputList2,setUserInputList2] = useState([])
  const [user,setUser] = useState(false)
  // KODUNUZ BURAYA GELECEK
  const userFetch = async () => {
    try{
      const response = await fetch(`https://randomuser.me/api?results=${userInput}`)
      const data = await response.json()
      const dataDistructure = data.results.map((result) => {
        return{
          id: result.login.uuid,
          name: result.name.first,
          title: result.name.title
      }
      })
      setUserInputList1((pre) => [...pre,...dataDistructure])
      setUserInputList2((pre) => [...pre,...dataDistructure])
    }
    catch (err){
      console.error(`Veri alınamadı ${err.message}`)
    }
  }

  useEffect(() => {
    if(user){
      userFetch()
    }
  },[])

const handleInputChange = (event) => {
  setUser(true)
  setUserInput(event.target.value)
  const filteredUser = userInputList1.filter((user) => (
    user.name.toLowerCase().includes(userInput.toLowerCase())
  ))
  setUserInputList2(filteredUser)
  userFetch()
}

 const handleSubmit = (event) => {
   setUser(true)
   event.preventDefault()
   userFetch()
   setUserInput("")
}
return(
  <div>
    <form onSubmit={handleSubmit}>
     <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Search users"
   />
    </form>
   <ul>
   {userInputList2.map((user) => (
      <li key={user.id}>{user.title} {user.name}</li>
    ))}
   </ul>
  </div>
)
}

export default App;
//////////
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// function App() {
//   const [userInput,setUserInput] = useState("")
//   const [userInputList,setUserInputList] = useState([])
//   const [user,setUser] = useState(false)
//   // KODUNUZ BURAYA GELECEK
//   const userFetch = async () => {
//     try{
//       const response = await fetch(`https://randomuser.me/api?results=${userInput}`)
//       const data = await response.json()
//       const dataDistructure = data.results.map((result) => {
//         return{
//           id: result.login.uuid,
//           name: result.name.first,
//           title: result.name.title
//       }
//       })
//       setUserInputList((pre) => [...pre,...dataDistructure])
//     }
//     catch (err){
//       console.error(`Veri alınamadı ${err.message}`)
//     }
//   }

//   useEffect(() => {
//     if(user){
//       userFetch()
//     }
//   },[])

// const handleSubmit = (event) => {
//   setUser(true)
//   event.preventDefault()
//   userFetch()
//   setUserInput("")
// }
// return(
//   <div>
//     <form onSubmit={handleSubmit}>
//     <input type="text" value={userInput} onChange={(event) => setUserInput(event.target.value)} />
//   </form>
//    <ul>
//    {userInputList.map((user) => (
//       <li key={user.id}>{user.title} {user.name}</li>
//     ))}
//    </ul>
//   </div>
// )
// }

// export default App;
