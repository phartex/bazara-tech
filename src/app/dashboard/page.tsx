"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

export default function Dashboard() {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDevices() {
      try {
        const res = await apiClient.get("/api/v1/devices?sortDirection=desc&page=0&size=30");
        const data = res.data;
        setDevices(data.content || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDevices();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading && <p>Loading devices...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg">
    <p>Dashboard content</p>
        </div>
      )}
    </div>
  );
}
