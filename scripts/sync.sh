#!bin/bash
fswatch -o '/Volumes/Notes/3. WRITING' | xargs -I{} cp -R "/Volumes/Notes/3. WRITING/migrating-rails-to-nextjs" "/Users/simon/Desktop/simonsomlai/public/articles/"


