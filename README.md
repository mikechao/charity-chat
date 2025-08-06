# 🏥 Charity Chat

**Discover meaningful charities to support through AI-powered conversations**

Charity Chat is a modern web application that connects users with verified charitable organizations through an intuitive AI-powered interface. Built with Nuxt.js and integrating with the Model Context Protocol (MCP), it provides personalized charity recommendations based on user preferences and giving goals.

## ✨ Features

- 🤖 **AI-Powered Search** - Chat with AI to find charities that match your values and interests
- 🎯 **Personalized Recommendations** - Get tailored charity suggestions based on your preferences
- ✅ **Verified Charities** - Access data from CharityAPI.com with trusted, verified organizations
- 🔍 **Advanced Search** - Filter by location, category, revenue, and more
- 📱 **Responsive Design** - Beautiful UI with Tailwind CSS and Nuxt UI components
- 🔄 **Real-time Results** - Dynamic search results with pagination
- 📋 **Detailed Information** - View comprehensive charity details including financial data and activities

## 🚀 Tech Stack

- **Framework**: [Nuxt.js 3](https://nuxt.com/) - Vue.js framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Nuxt UI](https://ui.nuxt.com/)
- **AI Integration**: [WebMCP)](https://github.com/MiguelsPizza/WebMCP)
- **API**: [CharityAPI.com](https://charityapi.com/) for verified charity data
- **Type Safety**: TypeScript with Zod validation
- **Package Manager**: pnpm

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- Chrome browser with MCP B-Extension (for full AI functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mikechao/charity-chat.git
   cd charity-chat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```

   Add your CharityAPI.com API key to `.env`:
   ```env
   NUXT_CHARITY_API_KEY=your_charity_api_key_here
   ```

   Get your API key from [CharityAPI.com](https://charityapi.com/charity-api-basic-documentation)

4. **Install Chrome Extension** (Optional but recommended)

   Install the [MCP B-Extension](https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa) to enable full AI chat functionality.

### Integration with Claude Desktop

The website can also be interacted with through Claude Desktop.

1. Follow the installation direction above and make sure to install the Chrome Extension

2. Install the mcp-b/native-server
```bash
npm install -g @mcp-b/native-server
```

3. In your claude_desktop_config.json add the following
```json
{
  "mcpServers": {
    "mcp-b": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://127.0.0.1:12306/mcp"
      ]
    }
  }
}
```

## 🏃‍♂️ Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🔧 Available Scripts

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Generate static site
pnpm generate
```

## 🏗️ Project Structure

```
charity-chat/
├── assets/              # CSS and static assets
├── components/          # Vue components
│   ├── CharityDetailsModal.vue
│   ├── CharityResultCard.vue
│   ├── CharityResultList.vue
│   └── WelcomeComponent.vue
├── pages/              # Application pages
│   └── index.vue       # Main search interface
├── server/             # Server-side API routes
│   └── api/charity/    # Charity API endpoints
├── types/              # TypeScript type definitions
├── nuxt.config.ts      # Nuxt configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🔌 API Endpoints

The application provides several server-side API endpoints:

- `GET /api/charity/categories` - Fetch charity categories
- `POST /api/charity/search` - Search for charities
- `POST /api/charity/details` - Get detailed charity information

## 🤖 MCP Integration

The application integrates with the Model Context Protocol to provide AI-powered tools:

- **charity_search** - Search for charities based on user criteria
- **get_charity_details** - Fetch detailed information about specific charities
- **clear_charity_results** - Clear current search results
- **get_next_page** - Load more search results

## 🎨 UI Components

Built with modern Vue.js components and Nuxt UI:

- **WelcomeComponent** - Landing page with feature highlights
- **CharityResultList** - Grid display of search results
- **CharityResultCard** - Individual charity display cards
- **CharityDetailsModal** - Detailed charity information popup

## 📊 Data Sources

- **CharityAPI.com** - Verified charity data including:
  - Basic organization information
  - Financial data (Form 990)
  - Activities and classifications
  - NTEE (National Taxonomy of Exempt Entities) codes
  - Geographic information

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NUXT_CHARITY_API_KEY` | CharityAPI.com API key | Yes |

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

### Preview Production

```bash
pnpm preview
```

For deployment options, check the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CharityAPI.com](https://charityapi.com/) for providing charity data
- [Model Context Protocol](https://modelcontextprotocol.io/) for AI integration
- [Nuxt.js](https://nuxt.com/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/mikechao/charity-chat/issues) on GitHub.

---

**Made with ❤️ to help connect people with meaningful causes**
