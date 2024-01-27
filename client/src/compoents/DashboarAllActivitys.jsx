import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'


export default function DashboarAllActivitys() {
    const { currentuser } = useSelector(state => state.user)
    const [users, setusers] = useState([])
    const [comments, setcomments] = useState([])
    const [posts, setposts] = useState([])
    const [totaluser, settotaluser] = useState(0)
    const [totalpost, settotalpost] = useState(0)
    const [totalcomments, settotalcomments] = useState(0)
    const [lastmonthuser, setlastmonthuser] = useState(0)
    const [lastmonthposts, setlastmonthposts] = useState(0)
    const [lastmonthcomments, setlastmonthcomments] = useState(0)

    useEffect(() => {
        const fetchuser = async () => {
            axios.get('/user/getusers?limit=5')
                .then(({ data }) => {
                    // console.log(data.users)
                    // console.log(data.totaluser)
                    // console.log(data.lastmonthuser)
                    setusers(data.users)
                    settotaluser(data.totaluser)
                    setlastmonthuser(data.lastmonthuser)
                })
                .catch(e => console.log(e))

        }

        const fetchpost = async () => {
            axios.get('/post/get?limit=5')
                .then(({ data }) => {
                    // console.log(data.posts)
                    setposts(data.posts)
                    settotalpost(data.totalpost)
                    setlastmonthposts(data.lastmonthpost)
                })
                .catch(e => console.log(e))

        }

        const fetchcomments = async () => {
            axios.get('/comment/getcomments?limit=5')
                .then(({ data }) => {
                    // console.log(data)
                    setcomments(data.comments)
                    settotalcomments(data.totalcomments)
                    setlastmonthcomments(data.datalastmonthcomments)
                })
                .catch(e => console.log(e))
        }

        if (currentuser.isadmin) {
            fetchuser()
            fetchcomments()
            fetchpost()
        }

    }, [currentuser])



    return (
        <div className='p-3 md:mx-auto'>
            {/* 1 */}
            {/* top box container */}
            <div className=" lg:flex  justify-center gap-4">
                {/* user top box */}
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:*:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{totaluser}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />{lastmonthuser}
                        </span>
                        <div className="text-gray-500 ">Last month</div>
                    </div>
                </div>

                {/* posts top box*/}
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:*:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                            <p className='text-2xl'>{totalpost}</p>
                        </div>
                        <HiDocumentText className='bg-yellow-300 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />{lastmonthposts}
                        </span>
                        <div className="text-gray-500 ">Last month</div>
                    </div>
                </div>

                {/* comments top box*/}
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:*:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'>{totalcomments}</p>
                        </div>
                        <HiAnnotation className='bg-fuchsia-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />{lastmonthcomments}
                        </span>
                        <div className="text-gray-500 ">Last month</div>
                    </div>
                </div>
            </div>

{/* 2 */}
            {/* parent of table */}
            <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
                {/* table recentuser */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className='text-center p-2'>Recent User</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to='/dashboard?tab=user' >
                                View All
                            </Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>

                        {users && users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='text-gray-500 dark:text-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img src={user.photourl} alt="img" className='w-10 h-10 rounded-full bg-gray-500' />
                                    </Table.Cell>
                                    <Table.Cell><p>{user.username}</p></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>

                {/* table of comments */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className='text-center p-2'>Recent Comments</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to='/dashboard?tab=comments' >
                                View All
                            </Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>

                        {comments && comments.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y'>
                                <Table.Row className='text-gray-500 dark:text-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell className='w-96'>
                                        <p className='line-clamp-2'>

                                            {comment.content}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell><p>{comment.numberoflikes}</p></Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>

                {/* table of post  */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                    <div className="flex justify-between p-3 text-sm font-semibold">
                        <h1 className='text-center p-2'>Recent Post</h1>

                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to='/dashboard?tab=post' >
                                View All
                            </Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {posts && posts.map((post) => (
                            <Table.Body key={post._id} className='divide-y'>
                                <Table.Row className='text-gray-500 dark:text-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img src={post.image} alt="img" className='w-14 h-10 rounded-md bg-gray-500' />
                                    </Table.Cell>
                                    <Table.Cell className='w-96'><p>{post.title}</p></Table.Cell>
                                    <Table.Cell className='w-5'><p>{post.category}</p></Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>

            </div>
        </div>
    )
}
































