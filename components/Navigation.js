import Link from "next/link";

const Links = [
  { label: "Cabins", href: "/cabins" },
  { label: "About", href: "/about" },
  { label: "Guest area", href: "/account" },
];

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {Links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="hover:text-accent-400 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
