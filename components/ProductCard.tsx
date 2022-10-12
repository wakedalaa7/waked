import Link from "next/link"
import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../context/authContext"
import axios from "../lib/axios"



export const ProductCard = ({ product }: any) => {
    const [user, setUser] = useContext(AuthContext);



    const addToWishList = () => {
        toast.promise(axios.patch(`/wishlist/${product.id}/add`, {}).then(({ data }) => {
            setUser(data.user)
        }), {
            pending: 'Loading ...',
            success: 'Wishlist updated successfully',
            error: 'Registerating failed'
        });
        return false;
    }

    const addToCart = () => {
        toast.promise(axios.post(`/cart/add`, {
            product_id: product.id,
            quantity: 1,
        }).then(({ data }) => {
            setUser(data.user)
        }), {
            pending: 'Loading ...',
            success: 'Product added to cart',
            error: 'Request failed'
        });
        return false;
    }

    return (

        <div className="col-lg-4 col-md-6 text-center">
            <div className="single-product-item">
                <div className="product-image">
                    <a href={`/product/${product.id}`}>
                        <img src={product.imagePath as any} alt="" style={{ height: '300px', objectFit: 'cover' }} />
                    </a>
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>

                {
                    user
                        ? <>
                            <a className="cart-btn" onClick={addToCart}>
                                <i className="fas fa-shopping-cart" /> Add to Cart
                            </a>
                            <a className="cart-btn ml-2" onClick={addToWishList}>
                                <i className="fas fa-heart" /> Add to Wishlist
                            </a>
                        </>
                        : <Link href={`/login`}><a className="cart-btn"><i className="fa fa-shopping-cart"></i>Login</a></Link>
                }
            </div>
        </div>
    )
}

