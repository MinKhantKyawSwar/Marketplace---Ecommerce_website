import Card from "../../components/Dashboard/Card"
import {BanknotesIcon, UserGroupIcon, ShoppingCartIcon} from "@heroicons/react/24/outline"
import AreaCustomChart from "../../components/Dashboard/AreaChart"
import CustomBarList from "../../components/Dashboard/Bar"
import { useEffect, useState } from "react"

const Dashboard = ({products, users}) => {
    const [totalSales, setTotalSales] = useState(0);
    const [productCount, setProductCount] = useState(0);
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
            setProductCount(products.length)
            setUserCount(users.length)
        }
    },[products])
  return (
    <section>
    <div className='flex items-center gap-6'>
        <Card title={"Total Sales"} count = {`${totalSales} MMK`} icon={BanknotesIcon} note={"MMK"}/> 
        <Card title={"Active Users"} count = {userCount} icon={UserGroupIcon} note={"users"}/> 
        <Card title={"Products"} count = {productCount} icon={ShoppingCartIcon} note={"items"}/> 
    </div>
   <AreaCustomChart/>
   <CustomBarList/>
    </section>
  )
}

export default Dashboard