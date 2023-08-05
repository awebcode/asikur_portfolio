import { getAllProducts, getAllUserProducts, getAllUserProductsForAccount } from '@/actions/productAction';
import { getUserDetails, loadUser, loadUserProfile } from '@/actions/userAction';
import Account from '@/components/account/Account'
import OtherInfo from '@/components/account/OtherInfo';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
    const navigate=useRouter()
    const dispatch=useDispatch()
    const router = useRouter()
    const { id } = router.query;
    const { userDetails } = useSelector((state) => state.userDetails);
    const { products } = useSelector((state) => state.allProducts);
    const { user } = useSelector((s) => s.user);
    useEffect(() => {
      dispatch(loadUser());
      dispatch(loadUserProfile(id));
      dispatch(getUserDetails(id))
      // dispatch(getAllUserProductsForAccount(id))
    }, [dispatch, id])
  // if (user?._id === userDetails?._id) return; 
   
  return (
    <>
      {user?._id === userDetails?._id ? (
        <>
          {" "}
          <Account id={id} products={products} />
        </>
      ) : (
        <>
          <OtherInfo id={id} products={products} />
        </>
      )}
    </>
  );
}

export default UserProfile