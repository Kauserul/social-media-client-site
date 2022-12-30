import React from 'react'
import { useForm } from 'react-hook-form';

const Post = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const imgHostKey = process.env.REACT_APP_imgbb
  console.log(imgHostKey)

  const handlePost = e =>{
    const text = e.text
      const photo = e.photo[0]
      
      const formData = new FormData()

      formData.append('image', photo)
      const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`

      fetch(url, {
        method: "POST",
        body: formData
      })

      .then(res => res.json())
      .then(data => {
        if(data.success){
            const post = {
              text: text,
              photo: data.data.url
            }
            fetch('https://social-media-server-ruddy.vercel.app/', {
              method: 'POST',
              headers:{
                'content-type': 'application/json'
              },
              body:JSON.stringify(post) 
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data.acknowledged){
                alert('Your post done')
              }
            })
        }
      })


      
  }
  return (
    <div className='w-1/6 mx-auto'>
      <h2>Whats you mind?</h2>
      <form onSubmit={handleSubmit(handlePost)}>
        <textarea className='border mb-2' {...register("text")}></textarea>
        <br />
        <input type='file' className='mb-2' {...register("photo")}></input>
        <br />
        <button className='btn btn-primary btn-sm'>Post</button>
      </form>
    </div>
  )
}

export default Post