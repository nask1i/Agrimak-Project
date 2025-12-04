import  { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CreateProductForm from "../components/CreateProductForm";
import AllProductsSection from "../components/AllProductsSection";

const drawerWidth = 240;

export default function AdminPanel() {
  const [selectedView, setSelectedView] = useState<"create" | "list">("create");

  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            backgroundColor: "#f5f5f5", // gray background
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedView === "create"}
              onClick={() => setSelectedView("create")}
            >
              <ListItemText primary="Create Product" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedView === "list"}
              onClick={() => setSelectedView("list")}
            >
              <ListItemText primary="All Products" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        {selectedView === "create" && <CreateProductForm />}

        {selectedView === "list" && <AllProductsSection />}
      </Box>
    </Box>
  );
}
