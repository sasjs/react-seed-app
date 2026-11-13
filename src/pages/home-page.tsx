import './home-page.scss'

interface Tool {
  name: string
  role: string
  description: string
  href: string
}

interface RepoLink {
  label: string
  href: string
  /* shown without the scheme so a long repository URL fits one line; the href
   * keeps the full address */
  text: string
}

const LINKS: RepoLink[] = [
  {
    label: 'App source code',
    href: 'https://github.com/sasjs/react-seed-app',
    text: 'github.com/sasjs/react-seed-app'
  },
  {
    label: 'SASjs source code',
    href: 'https://github.com/sasjs/adapter',
    text: 'github.com/sasjs/adapter'
  },
  {
    label: 'SASjs on NPM',
    href: 'https://www.npmjs.com/search?q=%40sasjs',
    text: 'npmjs.com/@sasjs'
  }
]

const TOOLS: Tool[] = [
  {
    name: 'Adapter',
    role: 'what this app talks to SAS with',
    description:
      'The JavaScript client: requests, uploads, sessions and the request history behind the SAS logs panel.',
    href: 'https://adapter.sasjs.io'
  },
  {
    name: 'Core',
    role: 'the macro library',
    description:
      'The %webout, %mp_abort and %mp_dirlist macros the services here compile from, with a doxygen site for every one.',
    href: 'https://core.sasjs.io'
  },
  {
    name: 'CLI',
    role: 'compile, build, deploy',
    description:
      'One command to compile the services, build the frontend and deploy to Viya, SAS 9 or a SASjs Server.',
    href: 'https://cli.sasjs.io'
  },
  {
    name: 'Server',
    role: 'SAS behind a Node.js server',
    description:
      "A web server wrapping the SAS binary - and what this app's mock target imitates in the browser when there is none.",
    href: 'https://server.sasjs.io'
  },
  {
    name: 'Lint',
    role: 'code quality for SAS',
    description:
      'Linting and formatting for SAS code, in the spirit of the tools you already use for TypeScript.',
    href: 'https://github.com/sasjs/lint'
  },
  {
    name: 'VS Code',
    role: 'the editor extension',
    description:
      'Linting, highlighting and execution, plus compile, build and deploy without leaving the editor.',
    href: 'https://github.com/sasjs/vscode-extension'
  }
]

/**
 * The home page: what this app is, where its source lives, and the six pieces of
 * the SASjs stack it is built from. Plain markup and CSS - a reader copying this
 * seed should see React and SASjs, not somebody else's design system.
 */
export const HomePage = () => (
  <div className="home-page">
    <section className="hero">
      <h1>
        Welcome to the <span className="code">SASjs</span> Seed App for React
      </h1>

      <p className="lede">
        A React app talking to SAS through <code>@sasjs/adapter</code> - three
        services, a file upload, and a SAS Logs panel that marks the errors,
        warnings and notable notes in the log a request came back with.
      </p>

      <ul className="links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <span className="label">{link.label}</span>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </section>

    <section className="stack">
      <h2>The SASjs stack</h2>
      <p className="section-note">
        Six projects, one framework - this app uses four of them directly.
      </p>

      <div className="tiles">
        {TOOLS.map((tool) => (
          <a
            className="tile"
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="tile-name">{tool.name}</span>
            <span className="tile-role">{tool.role}</span>
            <span className="tile-description">{tool.description}</span>
          </a>
        ))}
      </div>
    </section>
  </div>
)

export default HomePage
