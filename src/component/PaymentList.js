import React from "react";
export default class ClassList extends React.Component{
    render(){
        return (
            <div>
                {/* list */}
                <div className="card col-sm-12 my-1">
                    <div className="card-body row bg-dark">
                        <div className="col-lg-5 col-sm-12">
                            <small className="text-warning">Officer ID:</small>
                            <h6 className="text-white">{this.props.id_petugas}</h6>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <small className="text-warning">Student Number:</small>
                            <h6 className="text-white">{this.props.nisn}</h6>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <small className="text-warning">Date: </small>
                            <h6 className="text-white">{this.props.tgl_bayar}</h6>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <small className="text-warning">Month of Payment:</small>
                            <h6 className="text-white">{this.props.bulan_dibayar}</h6>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <small className="text-warning">Year of Payment:</small>
                            <h6 className="text-white">{this.props.jumlah_bayar}</h6>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <small className="text-warning">Amount Paid:</small>
                            <h6 className="text-white">{this.props.jumlah_bayar}</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
