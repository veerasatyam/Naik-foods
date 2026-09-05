import { NextResponse } from "next/server";
import { getUsersFromDb, addUserAsync, User } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name, phone } = body;

    const users = await getUsersFromDb();

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json({ success: false, error: "Email and password are required." }, { status: 400 });
      }

      // Check if admin login
      if (email.toLowerCase() === "satyamsvs788@gmail.com") {
        const adminUser: User = {
          id: "usr_admin_satyam",
          name: "Satyam (Admin)",
          email: "satyamsvs788@gmail.com",
          phone: "9730046247",
          role: "admin",
          createdAt: new Date().toISOString(),
        };
        return NextResponse.json({ success: true, user: adminUser });
      }

      // Customer login check
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return NextResponse.json({ success: false, error: "No account found with this email." }, { status: 404 });
      }

      return NextResponse.json({ success: true, user });
    }

    if (action === "register") {
      if (!name || !email || !phone) {
        return NextResponse.json({ success: false, error: "Name, email, and phone are required." }, { status: 400 });
      }

      const role = email.toLowerCase() === "satyamsvs788@gmail.com" ? "admin" : "customer";

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        phone,
        role,
        createdAt: new Date().toISOString(),
      };

      await addUserAsync(newUser);
      return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    }

    return NextResponse.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
