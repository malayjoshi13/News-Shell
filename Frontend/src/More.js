import React from "react";
import "./More.css";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function More(props) {
  return (
    <div className="moreNews">
      <div className="moreNewsContainer">
        <div className="mNewsContainer">
          <div className="mImage">
            <h2 className="moreHeading">
              Hong Kong unveils $22 billion budget for virus-ridden economy
            </h2>
            <p className="moredate">Feb 23 &#9679; World &#9679; news loadge, US policy</p>
            <div className="moreImg">
              <img
                src="https://www.chinadailyhk.com/attachments/image/191/33/111/523795_220139/523795_220139_956_500_jpg.jpg"
                alt="image"
              ></img>
            </div>
            <div className="actions">
              <StarOutlineIcon fontSize="small xs-10"></StarOutlineIcon>
              <ForumRoundedIcon fontSize="small xs-10"></ForumRoundedIcon>
              <BookmarkAddOutlinedIcon fontSize="small xs-10"></BookmarkAddOutlinedIcon>
              <ShareIcon fontSize="small xs-10"></ShareIcon>
              <VolumeUpIcon fontSize="small xs-10"></VolumeUpIcon>
            </div>
          </div>
          <div className="mainContent">
            <h3 className="moreh3">What?</h3>
            <p className="moreNewsCont">
              Many tax curbs have been imposed which includes tax breaks and
              vouchers for consumption spending to tackle the setbacks of
              Omicron variant arising in the city.Hong Kong being an important
              financial capital of the world; the new wave has caused a major
              setback to the financial capital
            </p>
            <h3 className="moreh3">Where?</h3>
            <p className="moreNewsCont">
              As one of the leading international financial centres, Hong Kong
              is a prime location for financial services and home to many
              financial institutions. Hong Kong’s financial markets operate
              under effective and transparent regulations that are in line with
              international standards. Located at the heart of Asia, Hong Kong
              also thrives on close financial integration with Mainland China,
              extensive networks with the rest of the world, sound legal system,
              low and simple tax regime, free flow of capital, a full range of
              financial products, and a large pool of financial talents. The
              financial sector had a workforce of over 258,000, or nearly 7% of
              working population in Hong Kong in 2017, and contributed to some
              19% of Hong Kong's Gross Domestic Product.
            </p>
            <h3 className="moreh3">Why?</h3>
            <p className="moreNewsCont">
              Coronavirus disease 2019 (COVID-19) is a contagious disease caused
              by a virus, the severe acute respiratory syndrome coronavirus 2
              (SARS-CoV-2). The first known case was identified in Wuhan, China,
              in December 2019. The disease has since spread worldwide, leading
              to the ongoing COVID-19 pandemic. Symptoms of COVID‑19 are
              variable, but often include fever,[9] cough, headache, fatigue,
              breathing difficulties, loss of smell, and loss of taste. Symptoms
              may begin one to fourteen days after exposure to the virus. At
              least a third of people who are infected do not develop noticeable
              symptoms.[14] Of those people who develop symptoms noticeable
              enough to be classed as patients, most (81%) develop mild to
              moderate symptoms (up to mild pneumonia), while 14% develop severe
              symptoms (dyspnea, hypoxia, or more than 50% lung involvement on
              imaging), and 5% suffer critical symptoms (respiratory failure,
              shock, or multiorgan dysfunction). Older people are at a higher
              risk of developing severe symptoms. Some people continue to
              experience a range of effects (long COVID) for months after
              recovery, and damage to organs has been observed. Multi-year
              studies are underway to further investigate the long-term effects
              of the disease.
            </p>
          </div>
          <div className="backButton">
            <button className="backBtn">
              <a className="backLink" href="/">
                Back
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
