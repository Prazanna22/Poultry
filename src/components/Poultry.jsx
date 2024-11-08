import React, { useState } from 'react';
import chicken from '../assets/chicken.png'
import leg from '../assets/leg.png'
import wing from '../assets/wing.png'

export const Poultry = () => {
    const [legs, setLegs] = useState('');
    const [wings, setWings] = useState('');
    const [flesh, setFlesh] = useState('');
    const [orderDetails, setOrderDetails] = useState([]);

    const weight = { leg: 250, wing: 250, flesh: 1000 };
    const chickenWeight = 2000;

    const initialInventory = {
        legs: 100,
        wings: 100,
        flesh: 50,
        totalWeight: 100000,
    };

    const parsedLegs = parseInt(legs) || 0;
    const parsedWings = parseInt(wings) || 0;
    const parsedFlesh = parseInt(flesh) || 0;

    const totalOrderWeight = parsedLegs * weight.leg + parsedWings * weight.wing + parsedFlesh * weight.flesh;
    const chickensNeeded = Math.ceil(totalOrderWeight / chickenWeight);

    const calculateRemaining = () => {
        const remainingInventory = {
            legs: initialInventory.legs - parsedLegs,
            wings: initialInventory.wings - parsedWings,
            flesh: initialInventory.flesh - parsedFlesh,
            totalWeight: initialInventory.totalWeight - totalOrderWeight,
        };
        return remainingInventory;
    };

    const handleSubmit = () => {
        const remainingInventory = calculateRemaining();
        setOrderDetails(prevOrders => [
            ...prevOrders,
            {
                totalOrderWeight,
                chickensNeeded,
                remainingInventory,
            }
        ]);
        setFlesh('');
        setLegs('');
        setWings('');
    };

    return (
        <>
          <div className="mx-20 my-10">
            <h1 className='text-center font-bold text-4xl my-10'>Poultry Shop</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <div className='flex flex-col items-center gap-5'>
                    <img src={leg} alt="" className='w-32'/>
                    <label htmlFor="legs">Legs</label>
                    <input type="number" id="legs"  value={legs} onChange={(e) => setLegs(e.target.value)} className="border p-2 rounded w-full" placeholder="Enter legs count"
                    />
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <img src={wing} alt="" className='w-32'/>
                    <label htmlFor="wings">Wings</label>
                    <input type="number" id="wings" value={wings} onChange={(e) => setWings(e.target.value)} className="border p-2 rounded w-full" placeholder="Enter wings count"
                    />
                </div>
                <div className='flex flex-col items-center gap-5'>
                    <img src={chicken} alt="" className='w-32'/>
                    <label htmlFor="flesh">Flesh Portions</label>
                    <input type="number" id="flesh" value={flesh} onChange={(e) => setFlesh(e.target.value)} className="border p-2 rounded w-full" placeholder="Enter flesh count"
                    />
                </div>
            </div>

            <div className="flex justify-center my-10">
            <button onClick={handleSubmit} className="bg-green-500  text-white px-4 py-2 rounded mt-4">
                Submit Order
            </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 '>
                {orderDetails.length > 0 && orderDetails.map((order, index) => (
                    <div key={index} className="p-4 border rounded bg-gray-200">
                        <h3 className='font-bold my-2'>Order Summary</h3>
                        <p>Total Order Weight: {order.totalOrderWeight / 1000} kg</p>
                        <p>Chickens Needed: {order.chickensNeeded}</p>
                        <h4 className='font-bold my-2'>Remaining Inventory</h4>
                        <p>Legs: {order.remainingInventory.legs}</p>
                        <p>Wings: {order.remainingInventory.wings}</p>
                        <p>Flesh Portions: {order.remainingInventory.flesh}</p>
                        <p className='my-2'>Total Remaining Weight: {order.remainingInventory.totalWeight / 1000} kg</p>
                    </div>
                ))}
            </div>
          </div>
        </>
    );
};
