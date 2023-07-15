import { useState } from "react";

// importing color ring component as a loader to display while
import { ColorRing } from "react-loader-spinner";

import Navbar from "./navbar";

// importing styles
import styles from "../styles/billUploadCompStyles.module.css";

// file upload api request action
import { uploadFile } from "../api/fileApiRequest";


function BillUploadComp() {

    // initialize states for component
    const [billFile, setBillFile] = useState();
    const [uploadingFile, setUploadingFile] = useState(false);
    const [filepath, setFilepath] = useState("");

    // change handler when input type file value changes
    const onFileChange = (event) => {
        // if user has selected a file then update billFile
        if(event.target.files[0]){
            setBillFile(event.target.files[0]);
            return;
        }

        // if file not selected then initialize it empty
        setBillFile();
    };

    // form reset action
    const resetForm = () => {
        document.getElementById("e-bill-upload-form").reset();
        setBillFile();
        setFilepath("");
    }


    // form submit action
    const handleSubmit = async (event) => {

        // set uploading file true. display loader
        setUploadingFile(true);

        // prevent default submit action for form
        event.preventDefault();

        // if billfile not selected alert user.
        if(!billFile){
            alert("Bill file not selected");

            // set uploading file false. hide loader
            setUploadingFile(false);
            return;
        }

        // if billfile selected by user is not pdf then alert user.
        if(billFile.type!=="application/pdf"){
            alert("Only pdf file is allowed...!!");

            // set uploading file false. hide loader
            setUploadingFile(false);
            return;
        }

        // initialize form data
        let formData = new FormData();

        // append default username for demo.
        formData.append("username", "mayuresh");

        // append bill file to formdata
        formData.append("eBillFile", billFile, billFile.filename);


        // send request to api for uploading a file.
        const response = await uploadFile(formData);

        // if file upload fails then alert user the error msg received
        if(!response.fileUploaded){
            alert(response.msg);

            // set uploading file false. hide loader
            setUploadingFile(false);
            return;
        }

        // alert user for successful upload
        alert(response.msg);

        // replace '/' characters with -> in filepath
        const uploadFilepath = response.filepath.replaceAll("\\", " -> ");

        // update filepath
        setFilepath(uploadFilepath);

        // set uploading file false. hide loader
        setUploadingFile(false);
    };


  return (

    // main app container
    <div className={styles.appContainer}>

        {/* Navbar component */}
        <Navbar />

        <div className={styles.contentContainer}>

            <h2 className={styles.header}>E-Bill Upload</h2>

            {/* container for form and preview */}
            <div className={styles.formPreviewContainer}>

                {/* container for form */}
                <div className={styles.formContainer}>

                    {/* Upload form */}
                    <form id="e-bill-upload-form" onSubmit={ handleSubmit } className={styles.uploadForm}>

                        {/* Label for upload */}
                        <label htmlFor="file-upload">
                            Upload e-Bill file here : 
                            <span>* .pdf format</span>
                        </label>

                        {/* Input type file */}
                        <input type="file" accept=".pdf" onChange={onFileChange} id="file-upload" name="eBillFile" />

                        {
                            // if uploading file, display loader
                            uploadingFile ? 
                            (<div className={styles.loaderBtnContainer}>

                                {/* loader */}
                                <ColorRing
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="blocks-loading"
                                    wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />

                                {/* upload button disabled while uploading */}
                                <button type="submit" disabled >Upload</button>
                            </div>)

                            : (<div className={styles.loaderBtnContainer}>
                                {/* if filepath is present. Display filepath */}
                                { filepath ? (<p>
                                    File Uploaded Successfully..!!
                                    <br />
                                    <span>{filepath}</span>
                                </p>) : "" }

                                <div className={styles.btnContainer}>
                                    {/* if billfile is present display reset button */}
                                    { billFile ? (
                                        <button type="button" onClick={ resetForm } className={styles.resetBtn}>Reset</button>
                                    ) : "" }

                                    {/* if filepath is present display next button. Otherwise display upload button */}
                                    { filepath ? (
                                        <button type="button" className={styles.nextBtn}>Next</button>
                                    ) : <button type="submit" className={styles.nextBtn}>Upload</button> }
                                    
                                </div>
                            </div>)
                        }
                        
                    </form>

                </div>


                {/* if billfile is present i.e. User has selected a file then display preview for file. */}
                {
                    billFile ? 
                    (<div className={styles.previewContainer}>
                        <object data={URL.createObjectURL(billFile)} type="application/pdf" aria-label="e-Bill"></object>
                    </div>)
                    : ""
                }

            </div>

        </div>
      
    </div>
  );
}

export default BillUploadComp;
