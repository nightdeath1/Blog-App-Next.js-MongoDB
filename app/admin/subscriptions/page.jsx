"use client";

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails || []);
    } catch (err) {
      toast.error("Failed to fetch emails");
      console.error(err);
    }
  };
// Delete email
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoId },
      });

      toast.success(response.data.msg || "Email Deleted");
      fetchEmails();
    } catch (err) {
      toast.error("Failed to delete email");
      console.error(err);
    }
  };
// Edit email
  const editEmail = async (mongoId, newEmail) => {
    try {
      const trimmed = (newEmail || "").trim();

      if (!trimmed) return toast.error("Email cannot be empty");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return toast.error("Invalid email format");

      const response = await axios.put(
        "/api/email",
        { email: trimmed }, // JSON body
        { params: { id: mongoId } } // query param
      );

      toast.success(response.data.msg || "Email Updated");
      fetchEmails();
    } catch (err) {
      toast.error("Failed to update email");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>

      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {emails.map((item) => (
              <SubsTableItem
                key={item._id}
                mongoId={item._id}
                email={item.email}
                date={item.date}
                deleteEmail={deleteEmail}
                editEmail={editEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;