import React from "react";
import Modal from "../Components/UI/Modal/Modal";
import Auxillary from "./Auxillary";

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        constructor(props) {
            super(props);   
            this.state = {
                error: null
            }
            
            this.setState({error: null});
                this.reqInterceptor = axios.interceptors.request.use(req => {
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
                this.setState({
                    error: error
                });
            });
        }

        componentWillMount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeErrorModalHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Auxillary>
                    <Modal show={this.state.error} closeModal={this.closeErrorModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            );
        }
    }
};

export default WithErrorHandler;