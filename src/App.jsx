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
  const [friends, setFriends]=useState(initialFriends);
  const [selectedFriend, setSelectedFriend]=useState(null);
    const [showAddFriendForm,setShowAddFriendForm]=useState(false);
  
  function handleSelectedFriend(id){
    const searchFriend=friends.find((frnd)=> frnd.id===id);
    setSelectedFriend(searchFriend);
  }
   function handleShowFriendForm(){
   setShowAddFriendForm(!showAddFriendForm);
  }
  function handleAddFriend(newFriend){
    setFriends(friends=> [...friends , newFriend]);
  }
   return (
    <div className='app'>
       <div className='sidebar'>
          <FriendList friends={friends} onSelectFriend={handleSelectedFriend}/>
          {showAddFriendForm && <AddFriendForm onAddFriendSubmission={handleAddFriend} />}
           <Button onClick={handleShowFriendForm}>{showAddFriendForm ? <span>Close</span>:<span>Add Friend</span>}</Button>
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
    <input type="number" disabled />
    <label>Who's paying the bill</label>
    <select>
      <option value="you">You</option>
      <option value={`${friendToSplitWith.name}`}>{`${friendToSplitWith.name}`}</option>
    </select>
   </form>
  )
}
function AddFriendForm({onAddFriendSubmission}){
  const [friendName, setFriendName]=useState(" ");
  const [friendImgUrl, setFriendImgUrl]=useState("https://i.pravatar.cc/48?u=1188");

  function handleAddFriend(e){
    e.preventDefault();
    if(!friendName) return;

    //Create a random id using builtin method
    const id= crypto.randomUUID();
    const newFriend={
      id,
      name: friendName,
      //This gives each friend a consistent but different avatar, which is exactly what you want.
      image:`${friendImgUrl}?=${id}`,
      balance:0
    } 
    console.log(newFriend);
    onAddFriendSubmission(newFriend);
    setFriendImgUrl("https://i.pravatar.cc/48?u=1188");
    setFriendName(" ");
  }
 
  return(
        <form className='form-add-friend'>
          <label >Friend Name :</label>
          <input value={friendName} onChange={e=>setFriendName(e.target.value)} type="text" placeholder='e.g Qasim'/>
          <label >Image Url :</label>
          <input value={friendImgUrl} onChange={e=>setFriendImgUrl(e.target.value)} type="text" />
          <Button onClick={handleAddFriend}>Add</Button>
        </form>
  )
}
export default App

