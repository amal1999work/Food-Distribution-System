import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import Header from '../Admin/Header';

function Upload() {
  return (
    <div id="wrapper">
      <Sidebar/>
      <Header />

      <div className="content-wrapper">
      <div class="col-lg-12">
         <div class="card">
           <div class="card-body">
           <div class="card-title">Upload CSV File</div>
           <hr/>
            <form>
           <div class="form-group">
            <label for="input-1">Choose Downloaded CSV File</label>
            <input type="file" class="form-control" id="input-1" placeholder="Enter Your Name"/>
           </div>
           
           <div class="form-group">
            <button type="submit" class="btn btn-light px-5"><i class="zmdi zmdi-upload"> &nbsp;&nbsp;</i> Upload</button>
          </div>
          </form>
         </div>
         </div>
      </div>
      </div>
    </div>
  )
}

export default Upload
