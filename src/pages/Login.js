import React from "react"
import axios from "axios"
import { base_url } from "../config";

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            nama: "",
            nis: "",
            message: "",
            logged: true
        }
    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            nama: this.state.nama,
            nis: this.state.nis
        }

        let url = base_url + "/auth/login_siswa"
        

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let petugas = response.data.data
                let token = response.data.token
                localStorage.setItem("petugas", JSON.stringify(petugas))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-dark text-warning text-center">
                        <h4>Pembayaran SPP</h4>
                        <strong className="text-white">Login Petugas</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        <form onSubmit={ev => this.Login(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.nama}
                            onChange={ev => this.setState({nama: ev.target.value})} />
                            <input type="nis" className="form-control mb-1" value={this.state.nis}
                            onChange={ev => this.setState({nis: ev.target.value})}
                            autoComplete="false" />

                            <button className="btn btn-block btn-dark mb-1" type="submit">
                                Masuk
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
