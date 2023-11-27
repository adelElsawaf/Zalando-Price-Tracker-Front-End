import { useLocation, useParams } from "react-router-dom";
import useFetch from "../CustomHooks/useFetch";
import '../Styles/main.css'
import shoes from './../shoes.webp'
import { useState, useEffect } from "react";
import LineChart from "../Components/PriceHistoryLineChart";


function ItemDetails() {
    const location = useLocation()
    const { itemId } = location.state
    const [selectedSize, setSelectedSize] = useState("Choose Your Size");
    const [LatestItemBeforeDiscountPrice, setLatestItemBeforeDiscountPrice] = useState("")
    const [LatestItemAfterDiscountPrice, setLatestItemAfterDiscountPrice] = useState("")
    const [currency, setCurrency] = useState("")
    const [availability, setAvailability] = useState("")
    const [latestDate, setLatestDate] = useState("")

    const { data: item, itemError, itemLoading } = useFetch("http://ec2-51-20-96-112.eu-north-1.compute.amazonaws.com:8080/items" + itemId)
    const [priceHistory, setPriceHistory] = useState(null)
    function handleSizeClick(itemVariation) {
        setSelectedSize(itemVariation.size)
        setLatestItemBeforeDiscountPrice(itemVariation.price.beforeDiscount)
        setLatestItemAfterDiscountPrice(itemVariation.price.afterDiscount)
        setCurrency(itemVariation.price.currency)
        setAvailability(itemVariation.availability)
        setLatestDate(itemVariation.price.scrappedAt)

    }
    useEffect(() => {
        const fetchPriceHistory = async () => {
            try {
                const response = await fetch(`http://ec2-51-20-96-112.eu-north-1.compute.amazonaws.com:8080/items${itemId}/price?size=${selectedSize}&color=${item.variationList[0].color}`);
                const jsonData = await response.json();
                setPriceHistory(jsonData);
            } catch (error) {
            }
        };
        fetchPriceHistory()
    }, [selectedSize]);
    const chartData = { dates: [], beforeDiscountPrices: [], afterDiscountPrices: [] };
    if (priceHistory) {
        console.log(priceHistory)
        for (let i = 0; i < priceHistory.length; i++) {
            chartData.dates.push(priceHistory[i].scrappedAt)
            chartData.beforeDiscountPrices.push(priceHistory[i].beforeDiscount)
            chartData.afterDiscountPrices.push(priceHistory[i].afterDiscount)
        }
    }
    function latestPricesDiv() {
        if (selectedSize != "Choose Your Size") {
            return (<>
                <h5 className="text-center">Latest Prices
                    <span className="text-muted ms-1 h6">({item && latestDate})</span>
                </h5>
                <h5 className="text-capitalize orange "> After Discount: {item && LatestItemAfterDiscountPrice != 0 ? <span className="text-dark ">{LatestItemAfterDiscountPrice}
                    <span className="text-dark ms-1 h5">
                        {item && currency}
                    </span></span> : <span className="text-dark ">No Discount</span>}

                    <span className="text-muted ms-1 h6 text-capitalize">  ({item && availability})</span>
                </h5>

                <div>
                    <h5 className="orange ">Originally:
                        <span className="text-dark  ms-1">{item && LatestItemBeforeDiscountPrice}</span>
                        <span className="text-dark ms-1 h5">
                            {item && currency}
                        </span>
                    </h5>


                </div>
            </>)
        }
    }
    return (<>
        <div className="container">
            <div className="row mt-3">
                <div className="col-lg">
                    <img src={item && item.itemColor.imageUrl} className="img-fluid img-thumbnail object-fit-cover"></img>
                </div>
                <div className="col-lg">
                    <h3>{item && item.brandName}</h3>
                    <h2>{item && item.modelName}</h2>
                    <h5 className="text-capitalize ms-1 mt-3"> color : {item && item.itemColor.color}</h5>
                    <div className="border mt-3 rounded bg-light">
                        <div className="ms-3">
                            {latestPricesDiv()}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="mt-3 font-weight-bold">
                            <div className="btn-group w-100 ">
                                <button type="button" className="text-start fs-5  btn btn-lg  w-100 orange bg-light border" data-bs-toggle="dropdown"
                                    id="dropdownButton">
                                    {selectedSize}
                                </button>
                                <button
                                    type="button"
                                    className="btn orange bg-light border dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                </button>
                                <ul className="dropdown-menu w-100" style={{ maxHeight: `${6 * 35}px`, overflowY: 'auto' }}>
                                    {item && item.variationList.map((variation, index) => (
                                        <li className="border-bottom " key={index} onClick={() => { handleSizeClick(variation) }}>
                                            <h5 className="dropdown-item orange">
                                                {variation.size}
                                            </h5>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <LineChart data={chartData} ></LineChart>
                </div>
            </div>

        </div>

    </>)
}
export default ItemDetails;