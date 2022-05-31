import React, { useEffect } from 'react'
import style from "./index.module.less";

type Props = {
  imgSrc ?: string;
  rankName ?: string;
  rankUpdateTime ?: string;
}
const RankItem = (props: Props) => {
  const {imgSrc, rankName, rankUpdateTime } = props;
  return (
    <div className={style['rank-item']}>
      <div className={style['rank-ablumn-img']}>
        <img style={{
          width: "40px",
          height: "40px"
        }} src={imgSrc} alt="" />
      </div>
      <div className={style['rank-content']}>
        <div className={style['rank-name']}>{ rankName }</div>
        <div className={style['rank-update-time']}>{ rankUpdateTime }</div>
      </div>
    </div>
  )
}

export default RankItem;