import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li key="userId">
        <strong>User Id</strong> {userId}
      </li>
      <li key="username">
        <strong>Username</strong> {user.username}
      </li>
      <li key="email">
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
