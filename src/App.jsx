import { useState } from 'react'
import './App.css'
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends]=useState(initialFriends);
  
   return (
    <div className='app'>
       <div className='sidebar'>
          <FriendList friends={friends} />
       </div>
    </div>
  )

}
function Button({children, onClick}){
  return(
    <button onClick={onClick} className='button' >{children}</button>
  )
}
function FriendList({friends}){
    return(
      <ul>
      {
          friends.map((frnd)=>(
          <Friend
          key={frnd.id}
          id={frnd.id}
          imgSrc={frnd.image}
          name={frnd.name}
          balance={frnd.balance}
          
          />
          ))
      }
      </ul>
    )
}
function Friend({ imgSrc, name, balance}){
  return(
      <li >
           <img src={`${imgSrc}`} alt={`${name}`} />
          <h3>{`${name}`}</h3>
          { balance<0 && <p className="red"> You owe {name} ${Math.abs(balance)} </p>}
          { balance>0 && <p className="green"> {name} owe You ${Math.abs(balance)} </p>}
          { balance===0 && <p > You and {name} are even  </p>}

          <Button >Select</Button>

      </li>
  )
}
export default App

