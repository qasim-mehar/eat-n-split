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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  function handleSelectedFriend(id) {
    const searchFriend = friends.find((frnd) => frnd.id === id);
    if (selectedFriend && selectedFriend.id === id) setSelectedFriend(null);
    else setSelectedFriend(searchFriend);
    setShowAddFriendForm(false);
  }

  function handleShowFriendForm() {
    setShowAddFriendForm(!showAddFriendForm);
    setSelectedFriend(null);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  function handleBillSplitLogic(val) {
    setFriends(
      friends.map((frnd) =>
        frnd.id === selectedFriend.id
          ? { ...frnd, balance: selectedFriend.balance + val }
          : frnd
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} onSelectFriend={handleSelectedFriend} />
        {showAddFriendForm && <AddFriendForm onAddFriendSubmission={handleAddFriend} />}
        <Button onClick={handleShowFriendForm}>
          {showAddFriendForm ? <span>❌ Close</span> : <span>➕ Add Friend</span>}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          friendToSplitWith={selectedFriend}
          onbillSuplit={handleBillSplitLogic}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className='button'>
      {children}
    </button>
  );
}

function FriendList({ friends, onSelectFriend }) {
  return (
    <ul>
      {friends.map((frnd) => (
        <Friend
          key={frnd.id}
          id={frnd.id}
          imgSrc={frnd.image}
          name={frnd.name}
          balance={frnd.balance}
          handleSelectedFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ id, imgSrc, name, balance, handleSelectedFriend }) {
  return (
    <li>
      <img src={`${imgSrc}`} alt={`${name}`} />
      <h3>{`${name}`}</h3>
      {balance < 0 && <p className='red'>😓 You owe {name} ${Math.abs(balance)}</p>}
      {balance > 0 && <p className='green'>💸 {name} owes you ${Math.abs(balance)}</p>}
      {balance === 0 && <p>🤝 You and {name} are even</p>}
      <Button onClick={() => handleSelectedFriend(id)}> Select</Button>
    </li>
  );
}

function FormSplitBill({ friendToSplitWith, onbillSuplit }) {
  
  const [billValue, setBillValue] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const friendExpense = billValue ? billValue - yourExpense : '';
  const [billPaidBy, setBillPaidBy] = useState('you');

  function handleBillMovement(e) {
    e.preventDefault();
    if (!billValue || !yourExpense) return;
    onbillSuplit(billPaidBy === 'you' ? friendExpense : -yourExpense);
    setBillValue('');
    setYourExpense('');
  }

  return (
    <form key={friendToSplitWith.id} className='form-split-bill' onSubmit={handleBillMovement}>
      <h2>🧾 Split a bill with {friendToSplitWith.name}</h2>
      <label>💰 Bill value</label>
      <input
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
        type='number'
      />
      <label>🧍‍♂️ Your expense</label>
      <input
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billValue ? yourExpense : Number(e.target.value)
          )
        }
        type='number'
      />
      <label>👥 {friendToSplitWith.name}'s expense</label>
      <input value={yourExpense ? friendExpense : ''} type='number' disabled />
      <label>👛 Who's paying the bill</label>
      <select onChange={(e) => setBillPaidBy(e.target.value)}>
        <option value='you'>🧍 You</option>
        <option value='friend'>👥 {friendToSplitWith.name}</option>
      </select>
      <Button>💳 Split bill</Button>
    </form>
  );
}

function AddFriendForm({ onAddFriendSubmission }) {
  const [friendName, setFriendName] = useState(' ');
  const [friendImgUrl, setFriendImgUrl] = useState('https://i.pravatar.cc/48?u=1188');

  function handleAddFriend(e) {
    e.preventDefault();
    if (!friendName) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: friendName,
      image: `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };
    onAddFriendSubmission(newFriend);
    setFriendImgUrl('https://i.pravatar.cc/48?u=1188');
    setFriendName(' ');
  }

  return (
    <form className='form-add-friend'>
      <label>🧑 Friend Name</label>
      <input
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        type='text'
        placeholder='e.g Qasim'
      />
      <label>🖼️ Image URL</label>
      <input
        value={friendImgUrl}
        onChange={(e) => setFriendImgUrl(e.target.value)}
        type='text'
      />
      <Button onClick={handleAddFriend}>➕ Add</Button>
    </form>
  );
}

export default App;
