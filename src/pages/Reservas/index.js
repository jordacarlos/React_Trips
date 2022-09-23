import React from 'react'
import './style.css'
import {MdDelete, MdAddCircle, MdRemoveCircle}  from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux/'
import {removeReserve,updateAmountRequest} from '../../store/modules/reserve/actions'
import { Link } from 'react-router-dom'

export default function Reservas() {

  const reservers = useSelector(state => state.reserve)
  const dispatch = useDispatch();

  function handleDelete(id){
    dispatch(removeReserve(id));
  }

  function decrementAmount(trip){
    dispatch(updateAmountRequest(trip.id,trip.amount-1))
  }
  function incrementAmount(trip){
    dispatch(updateAmountRequest(trip.id,trip.amount +1))
  }


  return (
    <div>
      <h1 className='title'> Você solicitou {reservers.length} {reservers.length >= 1 ? 'reservas' : 'reserva'}</h1>

      {reservers.map(reserve =>(
        <div key={reserve.id} className="reservas">
          <img src ={reserve.image} 
          alt= {reserve.title}  />
          <strong>{reserve.title}</strong>
          <div id='amount'>
            <button type='button' onClick={() =>{decrementAmount(reserve)}}>
              <MdRemoveCircle size={25} /> 
            </button>
            <input type="text" readOnly value={reserve.amount}></input>
            <button type='button' onClick={() =>{incrementAmount(reserve)}}>
              <MdAddCircle size={25} />
            </button>
          </div>
          <button type='button'
            onClick={() =>{handleDelete(reserve.id)}}>
            <MdDelete size={20} color="#191919" />
         </button>
       </div>
      ))}
     
      <footer>
      <Link to="/"><button type='button'> Solicitar Reservas</button></Link>
      </footer>
    </div>
  )
}
