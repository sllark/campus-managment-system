import React, {useEffect, useRef, useState} from "react"
import {Field, Form, Formik} from "formik";

import getClasses from "../../../helpers/getClasses";
import axios from "../../../helpers/axios";
import FieldHeader from "../../ui/FieldHeader";
import Loading from "../../ui/Loading";


const AddTeacher = () => {
    const formikRef = useRef();

    const [feedback, setFeedback] = useState({})
    const [classes, setClasses] = useState(null);
    const [teachers, setTeachers] = useState(null);


    useEffect(() => {


        (async () => {

            getTeachers();
            let data = await getClasses();
            if (data.message === 'success') {
                let classesData = data.classes;
                classesData.map(ele => {
                    ele.isSelected = false;
                    return ele;
                })
                setClasses(classesData);
            } else {
                setFeedback({type: 'error', msg: data.data.message || data.statusText || "Server Error"})
            }

        })()


    }, [])

    const getTeachers = () => {

        axios.get('/getTeachersWithClasses')
            .then(r => {
                let data = r.data;
                if (data.message === 'success') {
                    setTeachers(data.teachers);
                    if (formikRef.current) formikRef.current.setFieldValue('teacher', data.teachers[0]._id);
                }

            })
            .catch(error => {
                let data = error.response.data;
                setFeedback({type: 'error', msg: data.message || error.response.statusText || "Server Error"})
            })

    }

    const initState = {
        teacher: "",
    }

    const toggleCheck = (id) => {

        let teachersData = [...teachers];
        const teacherIndex = teachersData.findIndex(ele => ele._id === formikRef.current.values.teacher);

        if (teacherIndex < 0) return;

        let teacherData = {...teachersData[teacherIndex]};
        let classesData = [...teacherData.classes];

        const classIndex = classesData.findIndex(ele => ele === id);


        if (classIndex >= 0) classesData.splice(classIndex, 1);
        else classesData.push(id);

        teacherData.classes = classesData;
        teachersData[teacherIndex] = teacherData;

        setTeachers(teachersData);


    }


    const saveTeacher = (values, {setSubmitting, setFieldError}) => {

        setFeedback({})
        // setLoading(true);

        // console.log()

        let teachersData = [...teachers];
        const teacherIndex = teachersData.findIndex(ele => ele._id === formikRef.current.values.teacher);


        //TODO: SHOW ERROR
        if (teacherIndex < 0) return;

        axios
            .post('/updateTeacherClasses', {
                userID: teachersData[teacherIndex]._id,
                classes: teachersData[teacherIndex].classes
            })
            .then(r => {

                let data = r.data;
                if (data.message === 'success') {
                    setFeedback({
                        type: 'success',
                        msg: ('Class' + (teachersData[teacherIndex].classes.length > 1 ? 'es' : '') + ' Updated successfully.')
                    })
                }

            })
            .catch(error => {

                let data = error.response.data;
                setFeedback({
                    type: 'error',
                    msg: data.message || error.response?.statusText || "Failed to add Teacher."
                })
            })
            .then(() => {
                setSubmitting(false)
                // setLoading(false);
            })

    }


    return (

        <Formik
            initialValues={initState}
            innerRef={formikRef}
            onSubmit={saveTeacher}
        >
            {({isSubmitting, values, errors, touched, handleChange}) => (
                <Form className='dashboard__form'>

                    <div className="dashboard__form__header">

                        <h3 className="dashboard__form__header__title">
                            Assign Teacher
                        </h3>

                    </div>

                    {
                        feedback.msg ?
                            <h3 className={'formFeedback ' + feedback.type}>{feedback.msg}</h3> : null
                    }


                    <div className="dashboard__form__fieldsCont">


                        {
                            classes && teachers ? (
                                <>
                                    <div className="formGroup">

                                        <FieldHeader
                                            name='teachers'
                                            error={errors.teacher}
                                            touched={touched.teacher}
                                        />

                                        <Field
                                            as='select'
                                            name="teacher"
                                            id="teacher">

                                            {
                                                teachers && teachers.map(ele => <option key={ele._id}
                                                                                        value={ele._id}>{ele.firstName + " " + ele.lastName}</option>)
                                            }

                                        </Field>
                                    </div>

                                    <div className="w-100">

                                        <h3 className="heading-md bold mb-1">
                                            Select Class{classes?.length > 1 ? 'es' : ''}
                                        </h3>

                                        {
                                            classes && classes.map((ele, index) =>
                                                <ClassItem key={ele._id}
                                                           index={index}
                                                           item={ele}
                                                           classes={teachers.find(ele => ele._id === values.teacher)?.classes || []}
                                                           toggleCheck={toggleCheck}/>)
                                        }

                                    </div>

                                    <button type="submit" disabled={isSubmitting} className='btn btn--primary'>
                                        Save Teacher
                                    </button>

                                </>
                            ) : <Loading/>
                        }


                    </div>


                </Form>
            )}
        </Formik>


    )


}

const ClassItem = (props) => {


    let classItem = 'class-' + props.index;

    return (
        <div className="classItem">

            <label htmlFor={classItem}>
                <input
                    type="checkbox"
                    name={classItem}
                    id={classItem}
                    checked={props.classes.includes(props.item._id)}
                    onChange={() => {
                        props.toggleCheck(props.item._id)
                    }}
                />
                <p>
                    {props.item.name}
                </p>
            </label>

        </div>

    )

}


export default AddTeacher;
