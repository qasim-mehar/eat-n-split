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
  const [selectedFriend, setSelectedFriend]=useState(null);
  
  function handleSelectedFriend(id){
    const searchFriend=friends.find((frnd)=> frnd.id===id);
    setSelectedFriend(searchFriend);
  }
   return (
    <div className='app'>
       <div className='sidebar'>
          <FriendList friends={friends} onSelectFriend={handleSelectedFriend}/>
       </div>
        {selectedFriend && <FormSplitBill friendToSplitWith={selectedFriend}  />   }
    </div>
  )

}
function Button({children, onClick}){
  return(
    <button onClick={onClick} className='button' >{children}</button>
  )
}
function FriendList({friends,onSelectFriend}){
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
          handleSelectedFriend={onSelectFriend}
          
          />
          ))
      }
      </ul>
    )
}
function Friend({id, imgSrc, name, balance,handleSelectedFriend}){
  return(
      <li >
           <img src={`${imgSrc}`} alt={`${name}`} />
          <h3>{`${name}`}</h3>
          { balance<0 && <p className="red"> You owe {name} ${Math.abs(balance)} </p>}
          { balance>0 && <p className="green"> {name} owe You ${Math.abs(balance)} </p>}
          { balance===0 && <p > You and {name} are even  </p>}

          <Button onClick={()=>handleSelectedFriend(id)}>Select</Button>

      </li>
  )
}

function FormSplitBill({friendToSplitWith}){
  return(
  
   <form className='form-split-bill'>
    <h2>{`Split a bill with ${friendToSplitWith.name}`}</h2>
    <label>Bill value</label>
    <input type="number" />
    <label >Your expense</label>
    <input type="number" />
    <label>{`${friendToSplitWith.name}'s expense`}</label>
    <input type="number" />
    <label>Who's paying the bill</label>
    <select>
      <option value="you">You</option>
      <option value={`${friendToSplitWith.name}`}>{`${friendToSplitWith.name}`}</option>
    </select>
   </form>
  )
}
export default App

