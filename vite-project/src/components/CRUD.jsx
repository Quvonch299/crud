import React, { useEffect, useState } from 'react'
import { FaTimes, FaRegTrashAlt } from 'react-icons/fa'
import { GrEdit } from "react-icons/gr";
import axios from 'axios'
import toast from 'react-hot-toast';

export default function CRUD() {
  const [comment, setComment] = useState([])
  const [modal, setModal] = useState(false)
  const [text, setText] = useState('')
  const [picture, setPicture] = useState('')
  const [textarea, setTextarea] = useState('')
  const [editid, setEditid] = useState('')

  const GetData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/comments')
      setComment(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const PostData = async () => {
    if (!text.trim()) return alert('Iltimos, comment yozing!')

    try {
      if (editid) {
        await axios.put(`http://localhost:3000/comments/${editid}`, { text, picture, textarea })
      } else {
        await axios.post('http://localhost:3000/comments', { text, picture, textarea })
        toast.success('Add New Comments');
      }

      setText('')
      setPicture('')
      setTextarea('')
      setEditid('')
      setModal(false)
      GetData()
    } catch (e) {
      console.log(e)
    }
  }

  const EditData = async (id) => {
    try {
        
      const res = await axios.get(`http://localhost:3000/comments/${id}`)
      setText(res.data.text)
      setPicture(res.data.picture  )
      setTextarea(res.data.textarea  )
      setEditid(id)
      setModal(true)
      
    } catch (e) {
      console.log(e)
    }
  }

  const DeletData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${id}`)
      GetData()
      toast('',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {comment.map((post, index) => (
          <div
            key={post.id}
            className="flex flex-col items-center gap-3 p-5 rounded-3xl shadow-lg transition transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-white to-indigo-50"
          >
            <div className="flex justify-between w-full items-center mb-2">
              <p className="text-sm text-gray-500 font-medium">{index + 1})</p>
              <div className="flex gap-3">
                <button onClick={() => DeletData(post.id)} className="text-red-500 hover:text-red-700 transition">
                  <FaRegTrashAlt size={18} />
                </button>
                <button onClick={() => EditData(post.id)} className="text-blue-500 hover:text-blue-700 transition">
                  <GrEdit size={18} />
                </button>
              </div>
            </div>

            {post.picture && (
              <img
                src={post.picture}
                alt="comment img"
                className="h-40 w-40 object-cover rounded-2xl border-2 border-purple-200 shadow-md"
              />
            )}

            <p className="text-gray-800 font-semibold text-center break-words mt-2">{post.text}</p>
            <p className="text-gray-600 text-center break-words">{post.textarea}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setModal(true)}
          className="border fixed top-9 right-9 border-gray-400 rounded-3xl px-6 py-3 bg-white hover:bg-purple-100 transition shadow-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          ADD COMMENT
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => { setModal(false); setEditid(''); setText(''); setPicture(''); setTextarea(''); }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition p-2 rounded-full"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-bold text-center mb-4 text-indigo-700">{editid ? 'Edit' : 'Add'} Comment</h2>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Comment yozing..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4 shadow-sm transition"
            />

            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              placeholder="Rasm URL kiriting (https://...)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4 shadow-sm transition"
            />

            <textarea
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
              placeholder="Qo‘shimcha izoh..."
              className="w-full min-h-[80px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4 resize-none shadow-sm transition"
            ></textarea>

            <button
              onClick={PostData}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition shadow-md font-semibold"
            >
              {editid ? 'Yangilash' : 'Qo`shish'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
