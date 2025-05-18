        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            hamburger.classList.toggle('open');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.toggle('open');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add shadow to navbar on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });

        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Card hover effect
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Scroll to top button
        const scrollToTopBtn = document.createElement('div');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#FF9A9E] to-[#FFD1E8] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer opacity-0 invisible transition-all duration-300 z-40';
        document.body.appendChild(scrollToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission for CTA
        const contactBtn = document.querySelector('.btn-gradient');
        contactBtn.addEventListener('click', () => {
            // In a real implementation, this would open a contact form modal
            alert('Formulaire de contact ouvert!');
        });





        document.addEventListener('DOMContentLoaded', function() {
          // Get the search input element
          const searchInput = document.querySelector('.search-input');
          
          // Create a debounce function to limit how often the search runs
          function debounce(func, delay) {
              let timeout;
              return function() {
                  const context = this;
                  const args = arguments;
                  clearTimeout(timeout);
                  timeout = setTimeout(() => func.apply(context, args), delay);
              };
          }
          
          // Function to remove highlights
          function removeHighlights() {
              const highlights = document.querySelectorAll('.search-highlight');
              highlights.forEach(highlight => {
                  const parent = highlight.parentNode;
                  parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                  parent.normalize();
              });
          }
          
          // Function to highlight text
          function highlightText(searchTerm) {
              if (!searchTerm || searchTerm.length < 2) return;
              
              // Remove previous highlights
              removeHighlights();
              
              // Convert search term to lowercase for case-insensitive matching
              const searchTermLower = searchTerm.toLowerCase();
              
              // Get the body content to search
              const bodyContent = document.body;
              
              // Function to search and highlight text in a node
              function searchNodeAndHighlight(node) {
                  if (node.nodeType === 3) { // Text node
                      const nodeText = node.nodeValue;
                      const lowerNodeText = nodeText.toLowerCase();
                      const index = lowerNodeText.indexOf(searchTermLower);
                      
                      if (index >= 0) {
                          // Create highlight element
                          const highlight = document.createElement('span');
                          highlight.className = 'search-highlight';
                          highlight.style.backgroundColor = '#FFFF00';
                          highlight.style.color = '#000000';
                          
                          // Extract the matched text
                          const before = document.createTextNode(nodeText.substring(0, index));
                          const match = document.createTextNode(nodeText.substring(index, index + searchTermLower.length));
                          const after = document.createTextNode(nodeText.substring(index + searchTermLower.length));
                          
                          highlight.appendChild(match);
                          
                          // Replace text node with before + highlight + after
                          const parent = node.parentNode;
                          parent.insertBefore(before, node);
                          parent.insertBefore(highlight, node);
                          parent.insertBefore(after, node);
                          parent.removeChild(node);
                          
                          return 1; // Found a match
                      }
                  } else if (node.nodeType === 1 && node.childNodes && 
                            !/(script|style|textarea)/i.test(node.tagName)) {
                      
                      // Skip the search input itself and any existing highlights
                      if (node === searchInput || node.classList.contains('search-highlight')) {
                          return 0;
                      }
                      
                      let matches = 0;
                      for (let i = 0; i < node.childNodes.length; i++) {
                          const childNode = node.childNodes[i];
                          i += searchNodeAndHighlight(childNode);
                          matches++;
                      }
                      return matches;
                  }
                  return 0;
              }
              
              // Start searching from the body
              searchNodeAndHighlight(bodyContent);
              
              // Scroll to the first highlight if any
              const firstHighlight = document.querySelector('.search-highlight');
              if (firstHighlight) {
                  firstHighlight.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center'
                  });
              }
          }
          
          // Add event listener to search input
          searchInput.addEventListener('input', debounce(function(e) {
              const searchTerm = e.target.value.trim();
              if (searchTerm.length >= 2) {
                  highlightText(searchTerm);
              } else {
                  removeHighlights();
              }
          }, 300)); // Wait 300ms after typing stops before searching
          
          // Add event listener to clear highlights when search is cleared
          searchInput.addEventListener('search', function(e) {
              if (e.target.value === '') {
                  removeHighlights();
              }
          });
      });