import "./Form.css";
import { postData, updateData } from "../api/PostApi";
import { useState, useEffect } from "react";

export const Form = ({
    data,
    setData,
    updateDataApi,
    setUpdateDataApi
}) => {

    const [addData, setAddData] = useState({
        title: "",
        body: "",
    });

    const isEmpty = Object.keys(updateDataApi).length === 0;

    useEffect(() => {
        if (!isEmpty) {
            setAddData({
                title: updateDataApi.title || "",
                body: updateDataApi.body || "",
            });
        }
    }, [updateDataApi, isEmpty]);


    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };


    const addPostData = async () => {
        const res = await postData(addData);

        console.log("res", res);

        if (res.status === 201) {
            setData([...data, res.data]);

            setAddData({
                title: "",
                body: "",
            });
        }
    };


    const updatePostData = async () => {

        const res = await updateData(
            updateDataApi.id,
            addData
        );

        console.log(res);

        if (res.status === 200) {

            const updatePost = data.map((curPost) => {

                if (curPost.id === updateDataApi.id) {
                    return res.data;
                }

                return curPost;
            });

            setData(updatePost);

            setAddData({
                title: "",
                body: "",
            });

            setUpdateDataApi({});
        }
    };


    const handleFormSubmit = (e) => {

        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        if (action === "add") {
            addPostData();
        } 
        else if (action === "edit") {
            updatePostData();
        }
    };


    return (
        <>
            <form onSubmit={handleFormSubmit}>

                <section className="form-section">

                    <input
                        type="text"
                        name="title"
                        autoComplete="off"
                        placeholder="Add Title"
                        value={addData.title}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        name="body"
                        autoComplete="off"
                        placeholder="Add posts"
                        value={addData.body}
                        onChange={handleInputChange}
                    />

                    <button
                        type="submit"
                        value={isEmpty ? "add" : "edit"}
                    >
                        {isEmpty ? "Add" : "Edit"}
                    </button>

                </section>

            </form>
        </>
    );
};