import React, { useEffect } from 'react'
import style from "./index.module.less";

type Props = {
  onClick?: React.MouseEventHandler;
  imgSrc?: string;
  rankName?: string;
  rankUpdateTime?: string;
}
const RankItem = (props: Props) => {
  const { imgSrc, rankName, rankUpdateTime, onClick } = props;
  return (
    <div className={style['rank-item']} onClick={onClick}>
      <img className={style['rank-ablumn-img']} src={`${imgSrc}?param=${150}x${150}`} alt="" />
      <div className={style['rank-content']}>
        <div className={style['rank-name']}>{rankName}</div>
        <div className={style['rank-update-time']}>{rankUpdateTime}</div>
      </div>
    </div>
  )
}

export default RankItem;