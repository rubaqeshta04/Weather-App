import * as React from "react";

// react
import { useEffect, useState } from "react";

// Material ui components
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// External libraries
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import "moment/locale/ar";
moment.locale("ar");
import { useTranslation } from "react-i18next";

export default function Weather() {
  const { t, i18n } = useTranslation();
  const [dataAndTime, setDateAndTime] = useState(null);
  const [local, setLocal] = useState("ar");
  const direction = local === "en" ? "ltr" : "rtl";
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });
  let cancelAxios = null;

  useEffect(() => {
    i18n.changeLanguage(local);
  }, []);
  useEffect(() => {
    setDateAndTime(t(moment().format("MMMM Do YYYY, h:mm:ss a")));

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.5016&lon=34.4667&appid=0c0010c462005fb5cc26e3921b5b4a17&units=metric&lang=en",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp);
        const min = Math.round(response.data.main.temp_min);
        const max = Math.round(response.data.main.temp_max);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          min,
          max,
          description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <>
      <div className={`w-full flex flex-col items-center group`} dir={direction}>
        <div 
          className="text-white w-full rounded-3xl p-8 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 relative overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Subtle Glow Effect inside the card */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

          {/* Header */}
          <div className="flex justify-between items-center mb-4 relative z-10">
            <Typography variant="h3" sx={{ fontWeight: 800, textShadow: "1px 1px 10px rgba(0,0,0,0.3)" }}>
              {t("Gaza")}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, fontWeight: 500 }}>{dataAndTime}</Typography>
          </div>
          <hr className="border-t border-white/20 mb-6" />

          {/* Content */}
          <div className="flex justify-between items-center gap-5 relative z-10">
            <div className="flex items-start flex-col">
              <div className="flex gap-4 items-center justify-start mb-2">
                <Typography variant="h1" sx={{ fontWeight: 900, textShadow: "2px 4px 15px rgba(0,0,0,0.4)" }}>
                  {temp.number}
                </Typography>
                <div className="transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                  <img src={temp.icon || null} className="w-24 drop-shadow-2xl" alt="weather-icon" />
                </div>
              </div>

              <Typography variant="h5" sx={{ textTransform: "capitalize", opacity: 0.9, marginBottom: 1 }}>{t(temp.description)}</Typography>
              <div className="flex gap-4 text-lg font-medium opacity-80 mt-1 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                <span>
                  {t("min")}: {temp.min}°
                </span>
                <span className="opacity-50">|</span>
                <span>
                  {t("max")}: {temp.max}°
                </span>
              </div>
            </div>
            <div className="transform transition-transform duration-1000 group-hover:translate-x-3 group-hover:-translate-y-3 opacity-90 drop-shadow-2xl">
              <CloudIcon style={{ fontSize: 220 }} />
            </div>
          </div>
        </div>

        <Button
          variant="contained"
          sx={{ 
            color: "white", 
            marginTop: 4, 
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "30px",
            padding: "10px 32px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.4s ease",
            "&:hover": {
              background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
              transform: "translateY(-3px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            }
          }}
          onClick={() => {
            if (local === "en") {
              setLocal("ar");
              i18n.changeLanguage("ar");
              moment.locale("ar");
            } else {
              setLocal("en");
              i18n.changeLanguage("en");
              moment.locale("en");
            }
            setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
          }}
        >
          {t(local === "en" ? "Arabic" : "English")}
        </Button>
      </div>
    </>
  );
}
