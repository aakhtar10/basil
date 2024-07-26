import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FiHome,
  FiBook,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSearch,
} from 'react-icons/fi';
import { Link, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../pages/Dashboard';

const LinkItems = [
  { name: 'Home', icon: FiHome, to: '/' },
  { name: 'Budget', icon: FiBook, to: '/budget' },
  { name: 'Explore', icon: FiCompass, to: '/explore' },
  { name: 'Favourites', icon: FiStar, to: '/favourites' },
  { name: 'Settings', icon: FiSettings, to: '/settings' },
];

const SidebarContent = ({ onClose, hovered, setHovered }) => (
  <Box
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    transition={{ base: 'none', md: 'width 1s ease' }}
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: hovered ? 60 : '80px' }}
    pos="fixed"
    h="full"
    display={{ base: 'none', md: 'block' }}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        {/* Title or Logo */}
      </Text>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <Link key={link.name} to={link.to}>
        <NavItem icon={link.icon} hovered={hovered}>
          {link.name}
        </NavItem>
      </Link>
    ))}
  </Box>
);

const NavItem = ({ icon, children, hovered, ...rest }) => (
  <Box as="a" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: { base: 'transparent', md: 'cyan.400' },
        color: { base: 'inherit', md: 'white' },
      }}
      {...rest}
    >
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: { base: 'inherit', md: 'white' },
        }}
        as={icon}
      />
      <Text
        display={hovered ? { base: 'none', md: 'block' } : 'none'}
        transition="opacity 0.2s ease"
        opacity={hovered ? 1 : 0}
      >
        {children}
      </Text>
    </Flex>
  </Box>
);

const MobileNav = ({ onOpen, hovered }) => (
  <Flex
    transition={'margin 1s ease'}
    ml={{ base: 0, md:hovered? 40 : 30 }}
    px={{ base: 4, md: 4 }}
    height="85px"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
  >
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<FiMenu />}
    />
    <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
      {/* Title or Logo */}
    </Text>
    <InputGroup w={{ base: 'full', md: 'auto' }} display={{ base: 'none', md: 'flex' }}>
  <InputLeftElement pointerEvents="none">
    <FiSearch color="gray.300" />
  </InputLeftElement>
  <Input placeholder="Search" variant="filled" type='search' />
</InputGroup>    <HStack spacing={{ base: '0', md: '6' }}>
      <IconButton size="lg" variant="ghost" aria-label="open notifications" icon={<FiBell />} />
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar
                size={'sm'}
                src={'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
              />
          
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  </Flex>
);

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hovered, setHovered] = useState(false);

  return (
    <Box minH="100vh" >
      <SidebarContent onClose={onClose} hovered={hovered} setHovered={setHovered} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <Box
              transition={{ base: 'none', md: 'width 1s ease' }}
              bg={useColorModeValue('white', 'gray.900')}
              borderRight="1px"
              borderRightColor={useColorModeValue('gray.200', 'gray.700')}
              w={{ base: 'full', md: hovered ? 60 : '80px' }}
              pos="fixed"
              h="full"
            >
              <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                  {/* Title or Logo */}
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
              </Flex>
              {LinkItems.map((link) => (
                <Link key={link.name} to={link.to}>
                  <NavItem icon={link.icon} >
                    {link.name}
                  </NavItem>
                </Link>
              ))}
            </Box>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <MobileNav hovered={hovered} onOpen={onOpen} />
      <Box ml={{ base: 0, md: hovered ? 60 : 20 }} p="4">
       <Routes>
        <Route path="/" element={<Dashboard/>} />
       </Routes>
      </Box>
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  hovered: PropTypes.bool.isRequired,
  setHovered: PropTypes.func.isRequired,
};

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  hovered: PropTypes.bool.isRequired,
};

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default SidebarWithHeader;
