import { loadUser } from '@/actions/userAction'
import CreateBlog from '@/blog/AllBlog/CreateBlog'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Create = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  },[dispatch])
  return (
      <>
      <CreateBlog/>
      
      </>
  )
}

export default Create