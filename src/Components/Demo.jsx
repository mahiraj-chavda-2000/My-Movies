import React, { useState, useEffect, useLayoutEffect } from "react"
// import "../styles/pages/blogs.module.scss"
import _ from "lodash"
import BlogComponent from "../components/BlogComponent"
import HeaderComponent from "../components/HeaderComponent"
import Footer from "../components/FooterComponent"
import LoaderComponent from "../components/LoaderComponent/index"
import SidebarComponent from "../components/SidebarComponent"
import { userService } from "../services"
import LoadMoreComponent from "../components/LoadmoreComponent/index"
import { createAppEvent } from "../utils/globalFuntion"
import { eventType, metaDetail } from "../utils/Constant"
import MetaSEO from "../components/SeoComponent"
import { useSelector } from "react-redux"

const Blog = (props) => {
    // States
    const [isLoading, setIsLoading] = useState(false)
    const [blogs, setBlogs] = useState(props.blogs)
    const [initial, setInitial] = useState(0)
    const [isLoadMore, setLoadMore] = useState(false)
    const isMobile = useSelector(
        (state) => state && state?.isMobileStore?.isMobile
    )
    // Hooks
    useEffect(() => {
        createAppEvent(props.pathname, eventType.route)
        // const fetchBlog = async () => {
        //   setIsLoading(false)
        //   fetchBlogs(initial)
        // }
        // fetchBlog()
    }, [])

    useLayoutEffect(() => {
        function updatePosition() {
            if (document.getElementById("blogItems")) {
                if (
                    window.scrollY + window.innerHeight >=
                    document.getElementById("blogItems").offsetHeight
                ) {
                    loadMoreData(blogs)
                }
            }
        }
        window.addEventListener("scroll", updatePosition)
        updatePosition()
        return () => window.removeEventListener("scroll", updatePosition)
    }, [blogs, initial])

    // Extra Events
    const loadMoreData = async (blogsData) => {
        if (initial < blogs.length) {
            await setInitial(blogs.length)
            await setLoadMore(true)
            fetchBlogs(blogs.length)
        }
    }

    // Api Events

    const fetchBlogs = async (initialData) => {
        const params = {
            initial: initialData,
        }
        await createAppEvent(
            `${props.pathname}/${eventType.fetchApi}/Fetch blogs/start`,
            eventType.fetchApi,
            params
        )
        userService.PostRequest("/blogs", params, true).then(async (data) => {
            await setIsLoading(false)
            await setLoadMore(false)
            if (data && data.isSuccess && data.data && data.data.length > 0) {
                await createAppEvent(
                    `${props.pathname}/${eventType.fetchApi}/Fetch blogs/end`,
                    eventType.fetchApi
                )
                await setBlogs((blogs) => blogs.concat(data.data))
            }
        })
    }

    // Render Events

    const renderSeo = () => (
        <>
            {/ <h1 className="ff_page_title ff_titleHeader ">{metaDetail.blogs.h1}</h1 > /}
                < MetaSEO metaDetail={metaDetail.blogs} />
        </>
    )
    return (
        <div className="ff_page_wrapper ff_blog_page_wrapper">
            <HeaderComponent
                currentPage={10}
                isNotificationAvl
                isUserIconAvl
                title="Blogs"
                pathName={props.pathname}
            />
            {renderSeo()}
            <div className="container-fluid flex-grow-1">
                <div className="ff_homeProfileSection_photos">
                    <div className="ff_d_flex  d-flex">
                        <SidebarComponent currentMenu={20} />
                        <div>
                            {!isMobile && (
                                <h1 className="ff_page_title_blogs ff_titleHeader ">
                                    {metaDetail.blogs.h1}
                                </h1>
                            )}

                            {blogs && blogs.length > 0 ? (
                                <div id="blogItems" className="blogItems">
                                    <BlogComponent pathName={props.pathname} blogs={blogs} />
                                    <LoadMoreComponent isLoading={isLoadMore} />
                                </div>
                            ) : (
                                !isLoading && (
                                    <div className="ff_message_no_found mt-4">
                                        <h4>No blogs found</h4>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <LoaderComponent isLoading={isLoading} />
            <Footer />
        </div>
    )
}

export async function getServerSideProps(context) {
    const data = await userService.PostRequest(
        "/blogs",
        {
            initial: 0,
        },
        false
    )
    const params = {
        pathname: "/blogs",
    }
    if (data?.isSuccess && data?.data?.length > 0) {
        params.blogs = data.data
    } else {
        params.blogs = []
    }

    return {
        props: params,
    }
}

export default Blog
