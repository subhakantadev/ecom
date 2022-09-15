import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../redux/actions/action'
import { useEffect } from 'react';

const Header = () => {
    const [price, setPrice] = useState(0)
    console.log(price)
    const getData = useSelector((state) => state.cartreducer.carts);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id))
    };
    const total = () => {
        let price = 0
        getData.map((e, k) =>
            price = e.price * e.qnty + price
        )
        setPrice(price)
    }
    useEffect(() => {
        total()
    }, [total])
    return (<>
        <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
            <Container>
                <NavLink to='/' className="text-decoration-none text-light mx-3" >AddTo Cart</NavLink>
                <Nav className="me-auto">
                    <NavLink to='/home' className="text-decoration-none text-light">Home</NavLink>

                </Nav>
                <Badge badgeContent={getData.length} color="primary"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <i class="fa-sharp fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                </Badge>
            </Container>


            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    getData.length ?
                        <div className='card_details' style={{}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Resturant Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getData.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                <img src={e.imgdata} alt="" srcset="" style={{ width: "5rem", height: "5rem" }} />
                                                            </NavLink>

                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹{e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}><i className='fas fa-trash smalltrash'></i></p>
                                                        </td>
                                                        <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                                            <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}><i className='fas fa-trash largetrash' ></i></p>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                                <p>Total : ₹ {price}</p>
                            </Table>
                        </div> :
                        <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "12rem", padding: 10, position: 'relative' }}>
                            <i className='fas fa-close smallclose' onClick={handleClose} style={{ position: 'absolute', top: 2, right: 20, fontSize: 22, cursor: 'pointer' }} />
                            <p style={{ fontSize: 20 }}>Your Cart is Empty</p>
                        </div>
                }

            </Menu>
        </Navbar>
    </>

    )
}
export default Header;