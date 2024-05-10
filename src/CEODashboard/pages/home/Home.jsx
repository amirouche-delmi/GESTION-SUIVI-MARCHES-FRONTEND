import "./home.scss";
import FeaturedInfo from "./components/featuredInfo/FeaturedInfo";
import WidgetLg from "./components/widgetLg/WidgetLg";
import Marches from "../marches/Marches";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Home() {
  const userData = useSelector((state) => state.userReducer);
  const [marches, setMarches] = useState([]);
  const [marchesParMois, setMarchesParMois] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/marche`);
        setMarches(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countMarchesParMois = () => {
    const marcheParMois = {};
    marches.forEach((marche) => {
      const date = new Date(marche.createdAt);
      const mois = `${date.getFullYear()}-${date.getMonth() + 1}`;
      marcheParMois[mois] = (marcheParMois[mois] || 0) + 1;
    });
    return marcheParMois;
  };

  useEffect(() => {
    const marchesParMoisData = countMarchesParMois();
    const formattedData = Object.keys(marchesParMoisData).map((mois) => ({
      mois: `${new Date(mois).toLocaleString('default', { month: 'short' })}-${new Date(mois).getFullYear()}`,
      "Nombre total de Marchés": marchesParMoisData[mois],
      "Nombre de Marchés évalués": marches.filter(item => item.ceoID === userData._id && new Date(item.createdAt).getMonth() + 1 === parseInt(mois.split('-')[1])).length
    }));
    setMarchesParMois(formattedData.reverse());
  }, [marches, userData]);

  return (
    <div className="home">
      <FeaturedInfo />
      <div className="chartContainer">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={marchesParMois}
            margin={{ top: 20, left: -25, right: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Nombre total de Marchés" fill="#007bff" />
            <Bar dataKey="Nombre de Marchés évalués" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="homeWidgets">
        <WidgetLg />
      </div>
    </div>
  );
}
