import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { DLT, ADD, REMOVE } from '../redux/actions/action'

export const CardsDetails = () => {
    const [data, setData] = useState([])
    const getData = useSelector((state) => state.cartreducer.carts);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const compare = () => {
        let compareData = getData.filter((e) => {
            return e.id == id
        })
        setData(compareData)
    }
    useEffect(() => {
        compare();

    }, [id])
    const send = (element) => {

        dispatch(ADD(element));
    }
    const remove = (item) => {

        dispatch(REMOVE(item));
    }
    const dlt = (id) => {
        dispatch(DLT(id))
        history("/")
    }
    return (
        <>
            <div className="container mt-2">
                <h2 className="text-center">
                    Items Details page
                </h2>
                <section className="container mt-3">
                    <div className="iteamsdetails">
                        {
                            data.map((e) => {
                                return (<>
                                    <div className="items_img">
                                        <img src={e.imgdata} alt="" />
                                    </div>
                                    <div className="details">
                                        <Table>
                                            <tr>
                                                <td>
                                                    <p><strong>Resturant : </strong>{e.rname} </p>
                                                    <p><strong>Price : </strong>₹{e.price} </p>
                                                    <p><strong>Dishes : </strong> {e.address}</p>
                                                    <p><strong>Total :</strong>₹{e.price * e.qnty}</p>
                                                    <div className="mt-5 d-flex justify-content-between align-items-center" style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                        <span style={{ fontSize: 24 }} onClick={e.qnty <= 1 ? () => dlt(e.id) : () => remove(e)}>-</span>
                                                        <span style={{ fontSize: 22 }}>{e.qnty}</span>
                                                        <span style={{ fontSize: 24 }} onClick={() => send(e)}>+</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p><strong>Rating : </strong><span style={{ background: 'green', color: "#fff", padding: "2px 5px", borderRadius: "5px" }}> {e.rating}*</span> </p>
                                                    <p><strong>Order Review :</strong> {e.somedata}</p>
                                                    <p ><strong>Remove : <span><i className='fas fa-trash' style={{ color: 'red', fontSize: "20px", cursor: "pointer" }} onClick={() => dlt(e.id)}></i></span></strong> </p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>
                                </>)
                            })
                        }

                    </div >
                </section >
            </div >
        </>
    )
}
