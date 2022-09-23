import api from '../../../services/api';
import { addReserveSuccess, updateAmountSuccess } from './actions';
import {select,call, put, all, takeLatest} from 'redux-saga/effects';
import history from './history';


function* addToReserve({id}){

    const trioExists = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    const myStock = yield call(api.get, `/stock/${id}`);

    const StockAmount = myStock.data.amount;

    const currentStock = trioExists ? trioExists.amount : 0;

    const amount = currentStock + 1

    if(amount > StockAmount){
        alert('Limite maximo de viagens')
        return
    }
    if (trioExists){
        yield put(updateAmountSuccess(id, amount))
    }
    else{
        const response = yield call(api.get, `trips/${id}`);
        const data ={
            ...response.data,
            amount:1,
        }

        yield put(addReserveSuccess(data));
        history.push('/reservas');
    }
}

function* updateAmount({id, amount}){
    if(amount <= 0) return;

    const myStock = yield call(api.get, `/stock/${id}`);

    const StockAmount = myStock.data.amount;

    if(amount > StockAmount){
        alert('Limite maximo de viagens')
        return;
    }

    yield put(updateAmountSuccess(id, amount));

}

export default all ([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
    
]);