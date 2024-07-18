import {
    Outlet,
    NavLink,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
  } from "react-router-dom";
  import { getContacts, createContact } from "../contact";
  
  export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }
  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
  }

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
          <Form id="search-form" role="search">
          <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
  <div id="search-spinner" aria-hidden hidden={true} />
  <div className="sr-only" aria-live="polite"></div>
              <button type="submit">New</button>
</Form>
            {/* <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form> */}
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {/* other code */}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>{/* other code */}</p>
          )}
        </nav>
        </div>
        <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
      </>
    );
  }