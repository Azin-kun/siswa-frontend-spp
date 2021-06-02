import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config";
import PaymentList from "../component/PaymentList"
import $ from "jquery"
import axios from "axios"

export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            bulan_dibayar: "",
            tahun_dibayar: "",
            id_spp: "",
            jumlah_bayar: "",
            pembayaran: [],
            selectedItem: null
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getPayment = () => {
        let url = base_url + "/pembayaran"

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pembayaran: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    Add = () => {
        $("#modal_Payment").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran: 0,
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            bulan_dibayar: "",
            tahun_dibayar: "",
            id_spp: "",
            jumlah_bayar: "",
        })
    }

    savePayment = event => {
        event.preventDefault()
        $("#modal_Payment").modal("hide")
        let form = new FormData()
        form.append("nisn", this.state.nisn)
        form.append("id_petugas", this.state.id_petugas)
        form.append("tgl_bayar", this.state.tgl_bayar)
        form.append("bulan_dibayar", this.state.bulan_dibayar)
        form.append("tahun_dibayar", this.state.tahun_dibayar)
        form.append("id_spp", this.state.id_spp)
        form.append("jumlah_bayar", this.state.jumlah_bayar)

        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPayment()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPayment()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getPayment()
        this.Add()
        
    }

    render(){
        return (
            <div>
                <Navbar />

                <div className="container">
                    <h3 className="text-bold mt-2">Payment List</h3>
                    { this.state.pembayaran.map(item => (
                        <PaymentList
                        key = {item.id_pembayaran}
                        id_petugas = {item.id_petugas}
                        nisn = {item.nisn}
                        tgl_bayar = {item.tgl_bayar}
                        bulan_dibayar = {item.bulan_dibayar}
                        bulan_dibayar = {item.tahun_dibayar}
                        jumlah_bayar = {item.jumlah_bayar}
                        
                         />
                    )) }
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add Payment
                   </button>
                </div>

                <div className="modal fade" id="modal_Payment">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-dark text-warning">
                                 <h4>Form Student</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveStudent(ev)}>
                                 Officer ID:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_petugas}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    Student National Number:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nisn}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    Date:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.tgl_bayar}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    Month of Payment:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.bulan_dibayar}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    Year of Payment:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jumlah_bayar}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    Amount Paid:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jumlah_bayar}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    Tuition ID:
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.id_spp}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                    />
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }

}
