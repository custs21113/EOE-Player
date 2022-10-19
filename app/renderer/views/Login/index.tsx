import React, { useEffect, useRef, useState } from 'react'
import style from './index.module.less'
import { getQrKey, login, checkStatus } from '../../api/login';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { account } from '../../api/user';
type Props = {}

function index({ }: Props) {
  const dispatch = useDispatch();
  const locationRef = useRef(window.location);
  const timerRef = useRef<any>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const song = useSelector(state => (state as any).song);
  const MyInterval = (func: Function, delay: number = 3000) => {
    timerRef.current = setTimeout(() => {
      if (locationRef.current.pathname === "/login") {
        func.call(null);
        clearTimeout(timerRef.current);
        MyInterval(func, delay);
      };
    }, delay);
    return timerRef.current;
  }

  const check = async (unikey: string) => {
    const result = await checkStatus(unikey);
    if (result.code === 800) {
      console.log('二维码已过期,请重新获取');
      clearTimeout(timerRef.current);
      console.log('重新生成二维码');
      initQrCode();
    }
    if (result.code === 803) {
      // 这一步会返回cookie
      console.log('授权登录成功');
      clearTimeout(timerRef.current);
    }
  }
  const initQrCode = async () => {
    const { data: { data: { unikey } } } = await getQrKey();
    console.log(unikey);
    const { data: { data: { qrimg, qrurl } } } = await login(unikey);
    imgRef.current?.setAttribute('src', qrimg);
    let timer = MyInterval(() => check(unikey), 3000);
    return () => {
    }
  }
  useEffect(() => {
    initQrCode();

  }, []);
  const handleAccount = async () => {
    const result = await account();
    console.log(result);
  }
  const handleUsername = (e: any) => {
    updateUsername(e.target.value)
  }
  const handlePassword = (e: any) => {
    updatePassword(e.target.value)
  }
  return (
    <div className={style.login}>
      <img ref={imgRef} />
      <div>
        <button onClick={handleAccount}>Account</button>
      </div>
      {/* <div>
        <input type="text" value={username} onChange={handleUsername}/>
      </div>
      <div>
        <input type="text" value={password} onChange={handlePassword}/>
      </div>
      <div>
        <button onClick={() => console.log(username, password)}>Login</button>
      </div> */}
    </div>
  )
}

export default index;