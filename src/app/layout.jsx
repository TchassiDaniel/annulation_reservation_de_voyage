import "./globals.css";
import {MoovingProvider} from "@/Utils/Provider";



export const metadata = {
  title: "Mooving.com",
  description: "Powered By 4GI students",
};

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
        <body className="overflow-x-hidden">
            <MoovingProvider>
                {children}
            </MoovingProvider>
     </body>
    </html>
  );
}
