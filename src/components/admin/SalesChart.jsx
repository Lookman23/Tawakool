import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const salesData = [
  { name: 'Juin', Ventes: 4000 },
  { name: 'Juil', Ventes: 3000 },
  { name: 'Août', Ventes: 2000 },
  { name: 'Sept', Ventes: 2780 },
  { name: 'Oct', Ventes: 1890 },
  { name: 'Nov', Ventes: 2390 },
  { name: 'Déc', Ventes: 3490 },
];

const SalesChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Vue d'ensemble des ventes</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}K FCFA`} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ventes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;