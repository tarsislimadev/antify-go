
const {
  ANTIFY_WS_PORT: ws_port,
  ANTIFY_HTTPS_PORT: https_port,
  ANTIFY_HTTP_PORT: http_port,
  ANTIFY_FTPS_PORT: ftps_port,
  ANTIFY_FTP_PORT: ftp_port,
  ANTIFY_NET_PORT: net_port,
  ANTIFY_ROOT_PASSWORD: root_password,
  ANTIFY_DATA_PATH: data_path,
} = process.env

module.exports = {
  root_password,
  data_path,
  https_port,
  http_port,
  ftps_port,
  ftp_port,
  net_port,
  ws_port,
}
