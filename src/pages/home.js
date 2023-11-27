import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import ItemDetails from './item';
function Home() {
  const [enteredUrl, setEnteredUrl] = useState(String)
  function getItemIdFromUrl(enteredUrl) {
    let itemId = enteredUrl.substring(enteredUrl.length - 18, enteredUrl.length - 5)
    return itemId
  }
  return (
    <>

      <div className='container'>
        <div className=' d-flex flex-column align-items-center'>
          <form className='w-50 d-flex flex-column align-items-center'>
            <h3 className='form-label'>Item Link</h3>
            <input type='url' className='form-control mb-3' onChange={e => setEnteredUrl(e.target.value)}  placeholder='Please enter a valid link'></input>
            <Link to={{ pathname: '/item/' + getItemIdFromUrl(enteredUrl) }} state={{ itemId:  getItemIdFromUrl(enteredUrl) }} class="btn bg-orange lh-lg fw-bold" >Get History</Link>
          </form>
        </div>
      </div>
    </>
  )
}
export default Home