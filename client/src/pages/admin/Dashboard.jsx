import Card from "../../components/Dashboard/Card"
import {BanknotesIcon, UserGroupIcon, ShoppingCartIcon} from "@heroicons/react/24/outline"
import AreaCustomChart from "../../components/Dashboard/AreaChart"
import CustomBarList from "../../components/Dashboard/Bar"
import { useEffect, useState } from "react"

const Dashboard = ({products, users, totalProducts, pendingProducts, setActiveTabKey}) => {
    const [totalSales, setTotalSales] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const calcTotalSales = () => {
        const totalAmount = products.reduce((a, b) =>{
            return a + Number(b.price)
        }, 0)
        setTotalSales(totalAmount)
    }
    useEffect(_=>{
        if(products.length){
            calcTotalSales();
            setUserCount(users.length)
        }
    },[products])
  return (
    <section>
    <div className='flex items-center gap-6 mt-2 mb-4'>
        <div className="w-full">
            <Card title={"Total Sales"} count = {`${totalSales}`} icon={BanknotesIcon} note={"MMK"}/> 
        </div>
        <div onClick={()=>setActiveTabKey("3")} className="w-full">
            <Card title={"Active Users"} count = {userCount} icon={UserGroupIcon} note={"users"}/> 
        </div>
        <div onClick={()=>setActiveTabKey("2")} className="w-full">
            <Card title={"Products"} count = {totalProducts} icon={ShoppingCartIcon} note={"items"}/> 
        </div>
        <div onClick={()=>setActiveTabKey("2")} className="w-full"  >
            <Card title={"Pending Products"} count = {pendingProducts} icon={ShoppingCartIcon} note={"pending"}/>
        </div>
    </div>
   <AreaCustomChart products={products}/>
   <CustomBarList products={products}/>
    </section>
  )
}

export default Dashboard