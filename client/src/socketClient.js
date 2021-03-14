import socketIOClient from "socket.io-client";
import { API } from './config';

const socket = socketIOClient(API);

export default socket;